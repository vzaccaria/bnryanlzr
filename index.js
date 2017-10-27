#!/usr/bin/env node

let capstone = require("capstone");
let _ = require("lodash");
let cs = new capstone.Cs(capstone.ARCH_ARM, capstone.MODE_THUMB);

let fs = require("fs");
const prog = require("caporal");

let main = () => {
  prog.argument("<file>", "ARM binary file").action((args, options) => {
    fs.readFile(args.file, (err, code2) => {
      cs.detail = true;
        _.map(cs.disasm(code2, 0x1000), i => {
        console.log(i.mnemonic, i.op_str);
      });
      cs.close();
    });
  });
  prog.parse(process.argv);
};

main();
