import { useState, type JSX } from "react";
import styled from "@emotion/styled";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import UserSchema from "../domain/schemas/UserSchema";
import type { UserType } from "../domain/schemas/UserSchema";
import userFetchApi from "../utils/userFetchApi";
import { css } from "@emotion/react";

const StyledForm = styled.form`
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    height: 60dvh;
    width: 80dvw;
    @media (min-width: 700px) {
        width: 50dvh
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledTitle = styled.h1`
    margin-bottom: 6%;
    font-weight: bold;
    font-size: 3rem;
    color: #007bff;
`;

const StyledField = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.16);
    margin-bottom: 4%;
    width: 80%;
    height: 10%;
`;
    
    const StyledInput = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 4%;
    font-size: 1.05rem;
    &:focus {
        outline: none;
    }
    &::-moz-placeholder {
            font-size: 1rem;
    }
    &:focus::-moz-placeholder {
            opacity: 0;
    }
`;

const StyledInputPassword = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    width: 100%;
    height: 100%;
`;

const VisibilityIcon = css`
    position: absolute;
    margin-right: 4%;
    opacity: 40%;
    cursor: pointer;
`;

const StyledVisibilityIcon = styled(VisibilityOutlinedIcon)`
    ${VisibilityIcon}
`;

const StyledVisibilityOffIcon = styled(VisibilityOffOutlinedIcon)`
    ${VisibilityIcon}
`;


const StyledButton = styled.button`
    margin: 4% 0;
    border: none;
    width: 80%;
    height: 10%;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
`;


const StyledLink = styled.span`
    margin-top: 2%;
    font-size: 0.8rem;
    color: #fff;
    a {
    color: #007bff;
        font-weight: bold;
    }
`;

const StyledError = styled.span`
    margin: 2rem 0;
    color: red;
`;

export default function SignUpFormControl(): JSX.Element {
    const [values, setValues] = useState<UserType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    }

    const [displayPassword, setDisplayPassword] = useState<{ password: boolean, confirmPassword: boolean }>({
        password: false,
        confirmPassword: false
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleDisplayPassword = (passwordType: "password" | "confirmPassword"): void => {
        setDisplayPassword(prev => ({
            ...prev,
            [passwordType]: !prev[passwordType]
        }));
    }

    const DisplayPasswordIcon = ({ passwordType }: { passwordType: "password" | "confirmPassword" }): JSX.Element => 
        displayPassword[passwordType]
            ? <StyledVisibilityOffIcon
                onClick={() => handleDisplayPassword(passwordType)}
                onMouseDown={(e) => e.preventDefault()}
            />
            : <StyledVisibilityIcon
                onClick={() => handleDisplayPassword(passwordType)}
                onMouseDown={(e) => e.preventDefault()}
            />
    ;

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setErrors({});
        const parsed = UserSchema.safeParse(values);
        if (!parsed.success) {
            const filteredFieldErrors: Record<string, string[]> = Object.fromEntries(
                Object.entries(parsed.error.flatten().fieldErrors).filter(
                    ([_, value]) => value != undefined
                ) as [string, string[]][]
            )
            return setErrors(filteredFieldErrors);
        }
        if (values.password != values.confirmPassword) {
            return setErrors({ confirmPassword: ["Passwords don't match"] });
        }
        userFetchApi(parsed.data);
    }

    return (
        <StyledForm>
            <StyledTitle>Sign Up</StyledTitle>
            <StyledField>
                <StyledInput
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                />
                {errors.username && (
                    <StyledError>{errors.username[0]}</StyledError>
                )}
            </StyledField>
            <StyledField>
                <StyledInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                />
                {errors.email && (
                    <StyledError>{errors.email[0]}</StyledError>
                )}
            </StyledField>
            <StyledField>
                <StyledInputPassword>
                    <StyledInput
                        type={displayPassword.password ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <DisplayPasswordIcon passwordType="password" />
                </StyledInputPassword>
                {errors.password && (
                    <StyledError>{errors.password[0]}</StyledError>
                )}
            </StyledField>
            <StyledField>
                <StyledInputPassword>
                    <StyledInput
                        type={displayPassword.confirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword as string}
                    />
                    <DisplayPasswordIcon passwordType="confirmPassword" />
                </StyledInputPassword>
                {errors.confirmPassword && (
                    <StyledError>{errors.confirmPassword[0]}</StyledError>
                )}
            </StyledField>
            <StyledButton
                type="submit"
                onClick={handleSubmit}
            >Submit</StyledButton>
            <StyledLink>
                Already have an account? <a>Login now</a>
            </StyledLink>
        </StyledForm>
    );
}
