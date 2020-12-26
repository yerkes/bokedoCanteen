<template>
    <view class="">
        <uni-forms :value="formData" ref="form">
            <uni-forms-item label="姓名" name="name">
                <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
            </uni-forms-item>
            <uni-forms-item required name="hobby" label="兴趣爱好">
                <uni-data-checkbox multiple v-model="formData.hobby" :localdata="hobby"/>
            </uni-forms-item>
            <uni-forms-item label="年龄" name="age">
                <input type="text" v-model="formData.age" placeholder="请输入年龄" @input="binddata('age',$event.detail.value)" />
            </uni-forms-item>
            <button @click="submitForm">Submit</button>
        </uni-forms>
    </view>
</template>
<script>
export default {
    data() {
        return {
            formData:{
                name:'',
                age:''
            },
            hobby: [{
                text: '足球',
                value: 0
            }, {
                text: '篮球',
                value: 1
            }, {
                text: '游泳',
                value: 2
            }]
        }
    },
    methods: {
        submitForm(form) {
            // 手动提交表单
            this.$refs.form.submit().then((res)=>{
                console.log('表单返回得值：', res)
            })
        }
    }
}
</script>

<style>
</style>