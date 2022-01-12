import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType {}
}

/*
 o arquivo styled.d.ts e uma arquivo que tipa outros arquivos da aplicação e para isso e basicamente informa
 um nome para propriedade e importar e assim podemos ver no exemplo acima.
*/