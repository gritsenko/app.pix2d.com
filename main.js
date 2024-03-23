import { dotnet } from './dotnet.js'

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const { dotnetRuntime, setModuleImports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

setModuleImports("myLocalStorage", {
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


const progressBar = document.getElementById("progress-value");

let progress = 0;
let maxProgress = 100;
const timer = setInterval(() => {
    const d = (maxProgress - progress) / 10;
    progress = Math.ceil(progress + d);

    if (progressBar !== null) {
        progressBar.style.width = progress + "%";
    }
    //console.log(progress);
},
    100);


//await dotnetRuntime.runMainAndExit(config.mainAssemblyName, [window.location.search]);
await dotnet.run();