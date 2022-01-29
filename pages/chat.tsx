import { Box, TextField, Button } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { Guid } from "guid-typescript";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { BtnSendSticker } from "../components/BtnSendeSticker";
import { Header } from "../components/Header";
import { MessageList } from "../components/MessageList";
import appConfig from "../config.json";
import { IMessage } from "../models/i-message";


export default function ChatPage() {
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseAnomKey, setSupabaseAnomKey] = useState("");

  const router = useRouter();
  const username = router.query.username as string;
  const [userMessagem, setUserMesagem] = useState("");
  const [messageList, setMessageList] = useState([] as IMessage[]);

  useEffect(() => {
    axios.get<{SUPABASE_URL:string, SUPABASE_ANOM_KEY:string}>('api/supabase')
    .then(result => {
        setSupabaseUrl(result.data.SUPABASE_URL);
        setSupabaseAnomKey(result.data.SUPABASE_ANOM_KEY);

        listenInRealTimeMessages(result.data.SUPABASE_URL, result.data.SUPABASE_ANOM_KEY, (newMessage) => {
          setMessageList((currentList) => {
            return [newMessage, ...currentList]
          })
        }, (id: Guid) => {
          setMessageList(currentList => {
            const messageToRemove = currentList.filter(messagem => messagem.id['value'] === id['value'])[0];
            if (messageToRemove === null) {
              console.log(currentList)
              return currentList;
            }
            const messageListFiltered = messageList.filter(messagem => {
              console.log(messagem)
              console.log(messagem.id !== id)
              console.log(messagem.id === id)
              console.log(messagem.id.equals(id))
              console.log(id)
              return messagem.id !== id
            });            
            return messageListFiltered;
          })         
        });
        getInitialMessages(result.data.SUPABASE_URL, result.data.SUPABASE_ANOM_KEY);
    })
    }, [])

  const getInitialMessages = (supabaseUrl: string, supabaseAnomKey: string) => {
    const supabaseClient = createClient(supabaseUrl, supabaseAnomKey);

    supabaseClient
      .from('messages')
      .select('*')
      .order('dataEnvio', { ascending: false })
      .then((messages) => {
          if(!messages.data) return;
        setMessageList(messages.data);
      })
  }
  
  const listenInRealTimeMessages = (supabaseUrl: string, supabaseAnomKey: string, newMsg: (message: IMessage) => void, remove: (msgId: Guid) => void) => {
    const supabaseClient = createClient(supabaseUrl, supabaseAnomKey);

    supabaseClient
    .from('messages')
    .on('INSERT', (result) => {
      newMsg(result.new)
    })
    .subscribe();

    supabaseClient
    .from('messages')
    .on('DELETE', (result) => {
      remove(result.old)
    })
  }

  const insertMessageOnDb = (message: IMessage) => {
    const supabaseClient = createClient(supabaseUrl, supabaseAnomKey);
    supabaseClient
    .from('messages')
    .insert({
      dataEnvio: message.dataEnvio,
      de: message.de,
      id: message.id['value'],
      imgUrl: message.imgUrl,
      texto: message.texto,
    })
    .then();
  }

  const handleNovaMenssagem = (newMessage: IMessage) => {
    if (newMessage.texto.length > 0){
      if (newMessage.texto !== null && newMessage.texto.trim() !== '') {
        insertMessageOnDb(newMessage);
        setUserMesagem("");
      }
    }   
  };

  const onRemove = (itemId: Guid): void => {
    const messageToRemove = messageList.filter(messagem => messagem.id['value'] === itemId['value'])[0];

    if (messageToRemove.de !== username) return;

    const messageListFiltered = messageList.filter(messagem => {
      return messagem.id !== itemId
    });
    setMessageList(messageListFiltered);

    const supabaseClient = createClient(supabaseUrl, supabaseAnomKey);

    supabaseClient
    .from('messages')
    .delete()
    .match({id: messageToRemove.id})
    .then();

  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/000/962/815/original/abstract-background-with-colorful-and-modern-style-vector.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
          mensagens={messageList}
          onRemove={onRemove}
          username={username}
          />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={userMessagem}
              onChange={(event) => {
                if (event.target.value !== null && event.target.value.trim() !== '') {
                  setUserMesagem(event.target.value)
                } else {
                  setUserMesagem('')
                }
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  const newMensagem = {
                    id: Guid.create(),
                    dataEnvio: new Date(),
                    de: username,
                    texto: userMessagem,
                    imgUrl: `https://github.com/${username}.png`,
                  } as IMessage;
                  handleNovaMenssagem(newMensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
              name="input"
            />
            <BtnSendSticker onStickerClick={(sticker: string) => {
              const newMensagem = {
                id: Guid.create(),
                dataEnvio: new Date(),
                de: username,
                texto: `:sticker: ${sticker}`,
                imgUrl: `https://github.com/${username}.png`,
              } as IMessage;
              handleNovaMenssagem(newMensagem);
            } }></BtnSendSticker>
            <Button
              variant="tertiary"
              colorVariant="accent"
              label="Send"
              iconName="arrowRight"
              onClick={(event) => {
                event.preventDefault();
                const newMensagem = {
                  id: Guid.create(),
                  dataEnvio: new Date(),
                  de: username,
                  texto: userMessagem,
                  imgUrl: `https://github.com/${username}.png`,
                } as IMessage;
                handleNovaMenssagem(newMensagem);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}