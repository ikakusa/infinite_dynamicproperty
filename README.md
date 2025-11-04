# 使い方
`extended_dp.js`をダウンロードしてプロジェクトに追加する

# サンプルコード
```js
import * as server from "@minecraft/server"
import * as extended_dp from "./extended_dp.js";

// getJSONの引数はtarget, name
// このコードだとserver.world.getDynamicPropertyと同じになる
// 戻り値はundefinedかobject
const json_value = extended_dp.getJSON(server.world, "test");

// storeJSONの引数はtarget, name, json_obj
// このコードだとserver.world.setDynamicPropertyと同じになる
extended_dp.storeJSON(server.world, "test", { json: "Hello World" });
```
