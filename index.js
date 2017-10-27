#!/usr/bin/env node

let capstone = require("capstone");
let _ = require("lodash");
let cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_THUMB);

let fs = require("fs");
let debug = require("debug")("bnr");
const prog = require("caporal");

let main = () => {
  prog
    .argument("<file>", "ARM binary file")
    .option(
      "--from <hexsaddr>",
      "offset within the .text section where code starts"
    )
    .option(
      "--to <hexeaddr>",
      "offset within the .text section where code ends"
    )
    .action((args, options) => {
      debug(options);
      fs.readFile(args.file, (err, code2) => {
        if (options.from && options.to) {
          let st = parseInt(options.from, 16);
          let en = parseInt(options.to, 16);
          let e = en - st;
          if (e > 0) {
            let code = new Buffer(e);
            code2.copy(code, 0, st, en);
            cs.detail = true;
            _.map(cs.disasm(code, 0x1000), i => {
              console.log(i.mnemonic, i.op_str);
            });
            cs.close();
          } else {
            throw "invalid start and end addresses";
          }
        } else {
          throw "invalid start and end addresses";
        }
      });
    });
  prog.parse(process.argv);
};

main();
