### HTML5 WEB Storage API 的工具库

用法：
------
`<script src="storage.js"></script>`

API:
-----
-   store.switchType(storageType):切换web storage 的类型，默认是sessionStorage，参数只有2个允许的字符串值，session和local。
-   store.set(key, val):设置要存储的键值对，key只能是字符串，val可以是字符串、数值、布尔值、数组、JSON对象。
-   store.get(key):通过key获取value,key只能是字符串,value的类型为存储时的类型，包含字符串、数值、布尔值、数组、JSON对象。
-   store.remove(key):通过key删除value,key只能是字符串;返回值包含删除结果及提示信息，{result: boolean value,message: string value}
-   store.clear():清空所有存储在localStorage或sessionStorage的值

tips:
------
-   localStorage和sessionStorage同时使用时使用store.switchType()切换类型即可。
-   web storage 的类型切换后执行的API,采用就近原则选择，即switchType()后的get()、set()、remove()、clear()都是前一个switchType()切换的类型在执行API。