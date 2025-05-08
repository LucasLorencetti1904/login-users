import "@fontsource/roboto/400.css";
import SignUpFormControl from "./components/SignUpFormControl";
import { Global, css } from "@emotion/react";

const GlobalStyle = () => {
    return (
        <Global styles={css`
            * {
                font-family: Roboto, 'sans-serif';
                margin: 0;
                padding: 0;
            }
            body {
                background-image: url(./background/stellar.jpg);               
                background-size: cover;
                height: 100dvh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `} />
    );
}

export default function App() {
    return (
        <>
            <GlobalStyle />
            <SignUpFormControl />
        </>
    );
}
