
all: bin/aes.o

bin/.f:
	mkdir -p bin
	touch bin/.f

bin/%.o: examples/%.asm bin/.f
	.eabi/bin/arm-none-eabi-as -mthumb -mcpu=cortex-m3 $< -o $@

bin/%.text: bin/%.o
	.eabi/bin/arm-none-eabi-objcopy --dump-section .text=$@ $<

dump:
	

clean:
	rm -rf bin
