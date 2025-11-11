import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/contexts/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 手机号验证
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        setError('请输入有效的手机号码')
        return
      }
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录成功
      const userData = {
        phone: phone,
        name: phone.slice(-4) // 简单示例，使用手机号后4位作为名称
      }
      
      login(userData)
      
      // 登录成功后跳转到同意书页面
      navigate('/consent-form', { replace: true })
    } catch (err) {
      setError('登录失败，请检查手机号和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ color: '#667eea' }}>心晴屿</h1>
              <p>心理健康监测平台</p>
            </div>
          
          {error && (
            <div style={{ color: 'red', marginBottom: '16px', padding: '12px', background: '#ffebee', borderRadius: '8px' }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>手机号</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="tel"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="请输入手机号码"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  transition: 'border-color 0.3s',
                  backgroundColor: 'white',
                  '&:focus': {
                    outline: 'none',
                    borderColor: '#667eea'
                  }
                }}
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  color: '#667eea',
                  fontSize: '20px'
                }}>📱</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>密码</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="请输入密码"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  transition: 'border-color 0.3s',
                  backgroundColor: 'white'
                }}
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  color: '#667eea',
                  fontSize: '20px'
                }}>🔒</span>
              </div>
            </div>
            
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#667eea',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.3s'
            }} disabled={loading}>
              {loading ? <span className="loading"></span> : '登录'}
            </button>
          </form>
          
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p>还没有账号？ <Link to="/register" style={{ color: '#667eea', textDecoration: 'none' }}>立即注册</Link></p>
          </div>
      </div>
    </div>
  )
}

export default LoginPage