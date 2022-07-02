export interface Theme {
    name: string;
    properties: any;
}

export const light: Theme = {
    name: "light",
    properties: {
        "--app-background": "#ffffff",
        "--header": "#0c0e16",
        "--text": "0C0E16",

        "--background-color-light": "#f8f8fb",

        "--add-indicator": "#ffffff",
        
        "--button-paid-light": "#f2fcf922",
        "--button-paid-light-indicator": "#33d69f",

        "--button-pending-light": "#ff8f0022",
        "--button-pending-light-indicator": "#ff8f00",

        "--button-draft-light": "#97979722",
        "--button-draft-light-indicator": "#373b53",

        "--primary-font": "#7e88c3",
        "--secondary-font": "#888eb0",

        "--logo-top": "#7c5dfa",
        "--logo-bottom": "#9277ff",

        "--menu-divider": "#494e6e",


        "--view-card-top": "#f9fafe",
        "--view-card-bottom": "#373b53",


        "--btn-background-edit": "#ebecf3",
        "--btn-background-delete": "#ec5757",
        "--btn-background-mark": "#7c5dfa",

        "--btn-add": "#f9fafe",
        "--btn-add-hover": "#dfe3fa"
    }
}

export const dark: Theme = {
    name: "dark",
    properties: {
        "--app-background": "#1E2139",
        "--header": "#ffffff",
        "--text": "#ffffff",
        
        "--background-color-light": "#141625",

        "--add-indicator": "#ffffff",

        "--button-paid-light": "#f2fcf922",
        "--button-paid-light-indicator": "#33d69f",

        "--button-pending-light": "#ff8f0022",
        "--button-pending-light-indicator": "#ff8f00",

        "--button-draft-light": "#97979722",
        "--button-draft-light-indicator": "#373b53",

        "--primary-font": "#7e88c3",
        "--secondary-font": "#888eb0",

        "--logo-top": "#7c5dfa",
        "--logo-bottom": "#9277ff",

        "--menu-divider": "#494e6e",


        "--view-card-top": "#252945",
        "--view-card-bottom": "#373b53",


        "--btn-background-edit": "#252945",
        "--btn-background-delete": "#ec5757",
        "--btn-background-mark": "#7c5dfa",

        "--btn-add": "#f9fafe",
        "--btn-add-hover": "#dfe3fa"
    }
};