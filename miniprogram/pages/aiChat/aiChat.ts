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
      
      // 模拟API调用
      // 注意：这里是临时的模拟实现，后续需要替换为真实的Coze API调用
      setTimeout(() => {
        this.mockApiCall(inputText);
      }, 1500);
    },
    
    // 模拟API调用（后续替换为真实API）
    mockApiCall(text: string) {
      // 记录日志
      console.log('模拟API调用中...');
      
      // 模拟返回结果
      const mockResult = {
        text: `这是对"${text}"的AI回复。Coze API将在这里返回文本内容。这只是一个模拟响应，实际开发中需要替换为真实的API调用。`,
        imageUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
      };
      
      // 设置返回结果
      this.setData({
        isLoading: false,
        hasResult: true,
        resultText: mockResult.text,
        resultImageUrl: mockResult.imageUrl
      });
      
      // 记录日志
      console.log('API调用完成，返回结果:', mockResult);
    },
    
    // 实际的API调用（后续实现）
    callCozeApi(text: string) {
      // 这里需要实现真实的Coze API调用
      // 代码实现将在API接口信息补充后添加
      console.log('待实现: 调用Coze API，参数:', text);
      
      // 示例实现框架
      wx.request({
        url: '后续补充的Coze API地址',
        method: 'POST',
        data: {
          query: text
          // 其他可能需要的参数
        },
        header: {
          'content-type': 'application/json',
          // 可能需要的认证信息
          'Authorization': '后续补充的认证信息'
        },
        success: (res: any) => {
          console.log('API调用成功:', res.data);
          
          // 处理返回结果
          const result = res.data;
          this.setData({
            isLoading: false,
            hasResult: true,
            resultText: result.text || '未返回文本内容',
            resultImageUrl: result.imageUrl || ''
          });
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