/*
https://github.com/microsoft/WinDbg-Samples/blob/master/SyntheticTypes/readme.md
非内置结构体 内存解析
*/
"use strict";
"use SynTypes";

function initializeScript()
{
    //
    // Return an array of registration objects to modify the object model of the debugger
    // See the following for more details:
    //
    //     https://aka.ms/JsDbgExt
    //
    return [
        new host.apiVersionSupport(1, 7),
        new host.functionAlias(ldtp,'ldtp'),
        new host.functionAlias(parse,'parse'),
        new host.functionAlias(exe,'exe'),
        ];
}


/*
https://blog.csdn.net/oShuangYue12/article/details/131107611?spm=1001.2014.3001.5501


show mem into struct of c
*/

function ldtp(path,boundModule,attributes){
    return null;
}

function output(msg){
    host.diagnostics.debugLog(msg)
}

function exe(cmd)
{
    var result = [];
    var obj = host.namespace.Debugger.Utility.Control.ExecuteCommand(cmd);
    // js  of not in
    for(var l of obj){
        result.push(l);
    }
    return result;
}

/*
Synthetic type  shortcoming:
1. 结构体中定义函数指针无法识别
2. typedef 定义别名类型使用不了

0:000> dx -r2 Debugger.Utility.Analysis.SyntheticTypes.CreateInstance("_gcrypt_cipher_handle",@$addr)
Error: Unable to get property 'size' of undefined or null reference [at SynTypes (line 102 col 5)]

Eek! We hit an error.
https://lowleveldesign.wordpress.com/2019/08/27/synthetic-types-and-tracing-syscalls-in-windbg/
https://lowleveldesign.wordpress.com/2016/06/30/natvis-files-and-type-templates-in-windbg/
Windbg无法计算某些我们自定义结构的size
*/

> 通过迭代展开定位到哪一个成员windbg 解析fault        
```
0:000> dx -r1 Debugger.Utility.Analysis.SyntheticTypes.ReadHeader("C:\\Users\\admin\\Desktop\\gcry.h","ntdll").Types[5].Description
Debugger.Utility.Analysis.SyntheticTypes.ReadHeader("C:\\Users\\admin\\Desktop\\gcry.h","ntdll").Types[5].Description                
    [0x0]            : int magic
    [0x1]            : size_t actual_handle_size
    [0x2]            : size_t handle_offset
    [0x3]            : void* spec
    [0x4]            : int algo
    [0x5]            : cipher_mode_ops mode_ops
    [0x6]            : cipher_bulk_ops bulk
    [0x7]            : int mode
    [0x8]            : unsigned int flags
    [0x9]            : __UNNAMED_TYPE_0 marks
    [0xa]            : __UNNAMED_TYPE_1 u_iv
    [0xb]            : __UNNAMED_TYPE_2 u_ctr
    [0xc]            : unsigned char[16] lastiv
    [0xd]            : int unused
0:000> dx -r1 Debugger.Utility.Analysis.SyntheticTypes.ReadHeader("C:\\Users\\admin\\Desktop\\gcry.h","ntdll").Types[5].Description[1]
Debugger.Utility.Analysis.SyntheticTypes.ReadHeader("C:\\Users\\admin\\Desktop\\gcry.h","ntdll").Types[5].Description[1]                 : size_t actual_handle_size
    Size             : Unable to get property 'size' of undefined or null reference [at SynTypes (line 102 col 5)]
    Align            : Unable to get property 'align' of undefined or null reference [at SynTypes (line 65 col 5)]
```

> 修正之后发现   Debugger.Utility.Analysis.SyntheticTypes.TypeTables  不能Clear
> 吐槽下微软  Debugger.Utility.Analysis.SyntheticTypes.ReadHeader竟然不支持重载，当原始文件更改了后（第一次加载错误的问题）没有生效

```
0:000> dx -r2 Debugger.Utility.Analysis.SyntheticTypes.CreateInstance("_gcrypt_cipher_handle",@$addr)
Debugger.Utility.Analysis.SyntheticTypes.CreateInstance("_gcrypt_cipher_handle",@$addr)                
    magic            : 0x24091964
    actual_handle_size : 0x7af
    handle_offset    : 0x0
    spec             : 0x7ffbbe964900 [Type: void *]
    algo             : 0x9
    mode_ops        
        encrypt          : 0x7ffbbe8808d0 [Type: void *]
        setiv            : 0x7ffbbe8808d0 [Type: void *]
        decrypt          : 0x7ffbbe87c880 [Type: void *]
        authenticate     : 0x0 [Type: void *]
        get_tag          : 0x0 [Type: void *]
        check_tag        : 0x0 [Type: void *]
    bulk            
        cfb_enc          : 0x7ffbbe8c8c30 [Type: void *]
        cfb_dec          : 0x7ffbbe8ca1b0 [Type: void *]
        cbc_enc          : 0x7ffbbe8c8d80 [Type: void *]
        cbc_dec          : 0x7ffbbe8ca960 [Type: void *]
        ofb_enc          : 0x0 [Type: void *]
        ctr_enc          : 0x7ffbbe8c8ee0 [Type: void *]
        ctr32le_enc      : 0x7ffbbe8c98e0 [Type: void *]
        ocb_crypt        : 0x7ffbbe8cb2a0 [Type: void *]
        ocb_auth         : 0x7ffbbe8cb2d0 [Type: void *]
        gcm_crypt        : 0x7ffbbe8cbca0 [Type: void *]
    mode             : 0x0
    flags            : 0x0
    marks           
        key              : 0x0
        iv               : 0x1
        tag              : 0x1
        finalize         : 0x0
        allow_weak_key   : 0x0
    u_iv            
        iv               [Type: unsigned char [16]]
    u_ctr           
        ctr              [Type: unsigned char [16]]
    lastiv           [Type: unsigned char [16]]
        [0]              : 0x63 [Type: unsigned char]
        [1]              : 0x8 [Type: unsigned char]
        [2]              : 0x26 [Type: unsigned char]
        [3]              : 0x83 [Type: unsigned char]
        [4]              : 0x76 [Type: unsigned char]
        [5]              : 0x18 [Type: unsigned char]
        [6]              : 0x86 [Type: unsigned char]
        [7]              : 0x4e [Type: unsigned char]
        [8]              : 0x75 [Type: unsigned char]
        [9]              : 0x13 [Type: unsigned char]
        [10]             : 0xd2 [Type: unsigned char]
        [11]             : 0xbe [Type: unsigned char]
        [12]             : 0x0 [Type: unsigned char]
        [13]             : 0x0 [Type: unsigned char]
        [14]             : 0x0 [Type: unsigned char]
        [15]             : 0x0 [Type: unsigned char]
    unused           : 0x0

```



function parse(structpath,structname,addr){
    output("start :)\n");
    output(`[*] load ${structpath} structs\n`);
    output(`[*] struct name: ${structname}\n`);

    exe(".scriptload D:\\Desktop\\petools\\windbgExt\\js\sys\\SynTypes.js");

    // var strs = "dx Debugger.Utility.Analysis.SyntheticTypes.ReadHeader("`${structpath}`",\"ntdll\")";
    exe("dx Debugger.Utility.Analysis.SyntheticTypes.ReadHeader(\"D:\\Desktop\\petools\\windbgExt\\js\\demo-struct.h\",\"ntdll\")");

    exe("dx -r2 Debugger.Utility.Analysis.SyntheticTypes.CreateInstance(\"_test\",@rbx)");

    exe("lm");

    output("over :)\n");
}
