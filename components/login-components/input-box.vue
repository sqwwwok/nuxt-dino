<template>
	<div class="inputbox">
		<img 
		:src="inputinfo.src" 
		:alt="inputinfo.src.match(/\w+\.[a-z]+$/g)"> 
		<el-input 
		:placeholder="inputinfo.placeholder"
		v-model="inputinfo.value"
		:show-password="inputinfo.type==='password'"
		@blur="$emit('blur')"
		@input="$emit('input')"
		/>
		<i 
		v-show="classState==='checked'" 
		class="el-icon-success"></i>
		<i 
		v-show="classState==='warning'" 
		class="el-icon-error"></i>
		<p :class="[classState]">{{ inputinfo.tip }}</p>
	</div>
</template>

<script>
export default {
	props: ['inputinfo'],
	computed: {
		classState(){
			if(this.inputinfo.value==='') return 'notinput';
			if(this.inputinfo.checked===true) return 'checked';
			return 'warning'
		},
	},
}
</script>

<style scoped>
.inputbox{
	display: grid;
	grid-template-areas: "img input label" ". p .";
	grid-template-columns: auto 340px 35px;
	grid-column-gap: 15px;
	margin: auto;
}
.inputbox img{
	grid-area: img;
	width: 35px;
}
.inputbox el-input{
	grid-area: input;
	font: 22px times;
}
.inputbox label{
	grid-area: label;
}
i.el-icon-success{
	color: #67C23A;
	font-size: 30px;
}
i.el-icon-error{
	color: #F56C6C;
	font-size: 30px;
}
.inputbox p{
	grid-area: p;
}
p.checked{
	color:  #67C23A;
}
p.warning{
	color:  #F56C6C;
}
</style>