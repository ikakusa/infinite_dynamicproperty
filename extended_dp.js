/**
 * @description dynamicPropertyに無限にjsonをいれれるようにする
 * @param {*} target
 * @param {string} name 
 * @param {*} json_obj 
 */
export function storeJSON(target, name, json_obj) {
    let old_data = {};
    try {
        const raw = target.getDynamicProperty(name);
        if (typeof raw === "string") old_data = JSON.parse(raw);
    } catch { }

    const str = JSON.stringify(json_obj);
    const chunks = [];
    for (let i = 0; i < str.length; i += 1000) {
        chunks.push(str.slice(i, i + 1000));
    }
    const chunk_length = chunks.length;

    if ((old_data.chunks ?? 0) > chunk_length) {
        for (let i = chunk_length; i < old_data.chunks; i++) {
            target.setDynamicProperty(`${name}_${i}`, undefined);
        }
    }

    target.setDynamicProperty(name, JSON.stringify({ chunks: chunk_length }));
    for (let i = 0; i < chunk_length; i++) {
        const chunk = chunks[i];
        target.setDynamicProperty(`${name}_${i}`, chunk);
    }
}
/**
 * @description 無限jsonから取り出せるようにする
 * @param {*} target
 * @param {string} name 
 * @param {*} json_obj 
 */
export function getJSON(target, name) {
    let str = "";
    const chunks = target.getDynamicProperty(name);
    if (!chunks || typeof chunks !== "string") return undefined;

    let chunk_info;
    try {
        chunk_info = JSON.parse(chunks);
    } catch {
        return undefined;
    }

    if (!chunk_info.chunks || typeof chunk_info.chunks !== "number") return undefined;

    const length = chunk_info.chunks;
    for (let i = 0; i < length; i++) {
        const part = target.getDynamicProperty(`${name}_${i}`);
        if (typeof part !== "string") return undefined;
        str += part;
    }

    try {
        return JSON.parse(str);
    } catch {
        return undefined;
    }
}
