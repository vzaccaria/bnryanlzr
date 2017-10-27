.syntax unified
.thumb

.align 2
.global AES_128_keyschedule
.type   AES_128_keyschedule,%function
AES_128_keyschedule:

	    //function prologue, preserve registers and free r2
	    push {r2,r4-r12,r14}

	    //load input
	    ldm r1, {r4-r7} //r1 now free to overwrite
	    //load key
	    ldmia r0!, {r8-r11}
	    mov.w r14, r0

	    //load table address once
	    ldr.w r12, =AES_Td0

	    //initial addroundkey
	    eor r4, r8
	    eor r5, r9
	    eor r6, r10
	    eor r7, r11

	    //round 1

	    ldmia r14!, {r8-r11} //rk[4]-rk[7]

