// aiChat.ts
// 获取应用实例，但不使用同名变量避免命名冲突
const appInstance = getApp<IAppOption>()

Component({
  data: {
    inputText: '',
    inputLength: 0,
    isLoading: false,
    hasResult: false,
    resultText: '',
    resultImageUrl: ''
  },
  
  methods: {
    // 处理输入变化
    onInputChange(e: any) {
      const value = e.detail.value;
      // 记录日志
      console.log('输入内容变化:', value);
      
      this.setData({
        inputText: value,
        inputLength: value.length
      });
    },
    
    // 提交请求到AI接口
    onSubmit() {
      const { inputText } = this.data;
      
      if (!inputText || inputText.trim() === '') {
        // 记录日志
        console.log('提交内容为空，不处理');
        return;
      }
      
      // 设置加载状态
      this.setData({
        isLoading: true
      });
      
      // 记录日志
      console.log('正在提交请求，内容:', inputText);
      
      // 调用实际的Coze API
      this.callCozeApi(inputText);
    },
    
    // 实际的API调用
    callCozeApi(text: string) {
      // 记录日志
      console.log('调用Coze API，参数:', text);
      
      wx.request({
        url: 'https://api.coze.cn/v1/workflow/run',
        method: 'POST',
        data: {
          workflow_id: "7488372093508288538", // 您的工作流ID
          parameters: {
            "input_text": text,                // 用户输入的消息
            "user_id": "1234567890"
          }
        },
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer pat_qpvAXJyfrpj8Sx6cDpHFu4j2D7Mrs1AqJQEg6DhftOdqWE3AQKU4MZOYgBsfOt6a'  // 您的API密钥
        },
        success: (res: any) => {
          console.log('API调用成功:', res.data);
          
          // 处理返回结果
          if (res.data.code === 0) { // 使用code === 0判断成功
            try {
              // 解析返回的data字段，它可能是JSON字符串
              let dataContent = res.data.data;
              if (typeof dataContent === 'string') {
                dataContent = JSON.parse(dataContent);
              }
              
              // 从正确的字段获取文本和图片
              const textContent = dataContent.output;
              const imageUrl = dataContent.pic;
              
              console.log('解析后的内容:', { text: textContent, imageUrl });
              
              this.setData({
                isLoading: false,
                hasResult: true,
                resultText: textContent || '未返回文本内容',
                resultImageUrl: imageUrl || ''
              });
            } catch (error) {
              console.error('解析返回数据失败:', error);
              wx.showToast({
                title: '解析返回数据失败',
                icon: 'none',
                duration: 2000
              });
              
              this.setData({
                isLoading: false
              });
            }
          } else {
            wx.showToast({
              title: '请求失败: ' + (res.data.msg || '未知错误'),
              icon: 'none',
              duration: 2000
            });
            
            this.setData({
              isLoading: false
            });
          }
        },
        fail: (err: any) => {
          console.error('API调用失败:', err);
          
          // 显示错误信息
          wx.showToast({
            title: '请求失败，请重试',
            icon: 'none',
            duration: 2000
          });
          
          this.setData({
            isLoading: false
          });
        }
      });
    },
    
    // 预览图片
    previewImage() {
      const { resultImageUrl } = this.data;
      if (resultImageUrl) {
        // 记录日志
        console.log('预览图片:', resultImageUrl);
        
        wx.previewImage({
          urls: [resultImageUrl],
          current: resultImageUrl
        });
      }
    }
  }
}); 