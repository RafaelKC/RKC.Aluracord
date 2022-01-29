import { Guid } from "guid-typescript";

export interface IMessage {
    id: Guid;
    texto: string;
    de: string;
    dataEnvio: Date;
    imgUrl: string;
  }