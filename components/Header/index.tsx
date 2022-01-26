import { Box, Text, Button } from "@skynexui/components";
import React from "react";

export const  Header = () => {
    return (
      <>
        <Box
          styleSheet={{
            width: "100%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="heading5">Chat</Text>
          <Button
            variant="tertiary"
            colorVariant="primary"
            label="Logout"
            href="/"
          />
        </Box>
      </>
    );
  }