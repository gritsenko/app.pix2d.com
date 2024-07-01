import { dotnet } from './dotnet.js'
import CommonStuff from './CommonStuff.js'

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

CommonStuff.startLoaderProgressbar();

const { dotnetRuntime, setModuleImports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

setModuleImports("main.js", {
    appStarted: () => CommonStuff.onAppStarted(),
    get: (key) => localStorage.getItem(key),
    set: (key, value) => {
        localStorage.setItem(key, value);
        console.log("Saved: ", key, value);
    },
    remvoe: (key) => localStorage.removeItem(key),
    clear: (key) => localStorage.clear()
});

//const config = dotnetRuntime.getConfig();
const config = getConfig();

//await dotnetRuntime.runMainAndExit(config.mainAssemblyName, [window.location.search]);
await dotnet.run();

