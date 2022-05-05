import { renderHook } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";

/*
    ATENÇÃO - forma de testar hooks 
*/

describe("validacao do hook de autenticacao", () => {
  it("Autenticacao hook", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    console.log("HOOK DE AUTENTICAÇÃO");
    // console.log(result.current);

    // result.current.signInWithGoogle();

    expect(result.current.user).toBeTruthy();

    expect(true).toEqual(true);
  });
});
