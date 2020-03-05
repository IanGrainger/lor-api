(async () => {
    const url_ = Deno.args[0];
    console.log('args 0', url_);
    const result = await fetch(url_);
    console.log('result', result);

    // write to a string
    const bodyArr = await Deno.readAll(result.body);
    // const bodyStr = new TextDecoder().decode(bodyArr);
    // const bodyObj = JSON.parse(bodyStr);
    // console.log('obj', bodyObj);

    //const file = await Deno.open(Deno.args[1], {write: true});
    await Deno.writeFile(Deno.args[1], bodyArr, {create: true});
    //file.close();
})();