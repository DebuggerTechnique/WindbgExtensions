# windbg js script

## invoke commands
```js
//
// reference from https://www.zcgonvh.com/post/powershell_malware_analysis_helper_clr_hook.html
//
function listmodule()
{
    var result = [];
    var obj = host.namespace.Debugger.Utility.Control.ExecuteCommand("lm");
    // js  of not in
    for(var l of obj){
        result.push(l);
    }
    return result;
}
```
