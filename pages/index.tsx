import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Title } from "../components/title";
import GitHubUserApiOutput from "../models/github-user-api-output.model";
import appConfig from "./../config.json";

export default function PaginaInicial() {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<GitHubUserApiOutput>({} as GitHubUserApiOutput);
  const route = useRouter();

  const setNewUser = (userName: string) => {
    setUsername(userName);
      axios.get(`api/users/${userName}`)
        .then(result => { setUser(result.data as GitHubUserApiOutput) })
        .catch(err => {
          console.log(err);
        });
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/000/962/815/original/abstract-background-with-colorful-and-modern-style-vector.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            tag="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Wellcome back!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              onChange={(event) => {setNewUser(event.target.value)}}            
              value={username}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              disabled={username.length <= 2}
              onClick={(event: any) => {
                event.preventDefault();
                route.push('chat') 
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[000],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            
            {
            username.length > 2 && <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={user.avatar_url}
            />
            }

            

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {user.login}
            </Text>
              <br/>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {user.name}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
