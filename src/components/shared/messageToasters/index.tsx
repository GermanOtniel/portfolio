import { Message } from "rsuite";

export const successMessage = (message: string) => (
  <Message showIcon type="success" closable>
    {message}
  </Message>
);

export const errorMessage = (message: string) => (
  <Message showIcon type="error" closable>
    {message}
  </Message>
);

export const infoMessage = (message: string) => (
  <Message showIcon type="info" closable>
    {message}
  </Message>
);

export const warningMessage = (message: string) => (
  <Message showIcon type="warning" closable>
    {message}
  </Message>
);