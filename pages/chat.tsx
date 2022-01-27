import { Box, TextField, Button, Icon } from "@skynexui/components";
import { Guid } from "guid-typescript";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { IMessage, MessageList } from "../components/MessageList";
import appConfig from "../config.json";

export default function ChatPage() {
  const [userMessagem, setUserMesagem] = useState("");
  const [messageList, setMessageList] = useState([] as IMessage[]);

  const handleNovaMenssagem = (newMessage: IMessage) => {
    if (newMessage.texto.length > 0){
      if (newMessage.texto !== null && newMessage.texto.trim() !== '') {
        setMessageList([newMessage, ...messageList]);
        setUserMesagem("");
      }
    }   
  };

  const onRemove = (itemId: Guid): void => {
    const messageListFiltered = messageList.filter(messagem => !messagem.id.equals(itemId));
    setMessageList(messageListFiltered);
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
                    de: "Rafael",
                    texto: userMessagem,
                    imgUrl: `https://github.com/${"RafaelKC"}.png`,
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
                  de: "Rafael",
                  texto: userMessagem,
                  imgUrl: `https://github.com/${"RafaelKC"}.png`,
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
