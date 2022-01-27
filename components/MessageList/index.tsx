import { Box, Text, Image, Button } from "@skynexui/components";
import { Guid } from "guid-typescript";
import React from "react";
import appConfig from "../../config.json";

export interface IMessageListInput {
  mensagens: IMessage[];
  onRemove(itemId: Guid): void;
}

export interface IMessage {
  id: Guid;
  texto: string;
  de: string;
  dataEnvio: Date;
  imgUrl: string;
}

export const MessageList = (props: IMessageListInput) => {
  return (
    <Box
      tag="ul"
      styleSheet={{
        display: "flex",
        overflow: "auto",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem: IMessage) => {
        return (
          <Text
            key={mensagem.id.toString()}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={mensagem.imgUrl}
              />
              <Button
                colorVariant="dark"
                label=""
                iconName="trash"
                size="sm"
                styleSheet={{
                    marginRight: '10px  '
                }}
                onClick={() => {props.onRemove(mensagem.id)}}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {mensagem.dataEnvio.toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
};
