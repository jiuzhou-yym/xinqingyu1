import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// 创建认证上下文
const AuthContext = createContext(null);

// 认证提供者组件
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // 检查本地存储中的认证状态
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        // 尝试获取用户信息
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          try {
            setUser(JSON.parse(userInfo));
          } catch (e) {
            console.error('解析用户信息失败', e);
          }
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // 模拟登录API调用
  const login = async (phone, password) => {
    setAuthLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 简化的登录验证 - 用于演示目的
      // 如果提供了phone和password，使用它们；否则使用默认值
      const loginPhone = phone || '13800138000';
      const loginPassword = password || '123456';
      
      // 总是通过验证，用于演示
      const userData = {
        phone: loginPhone,
        name: loginPhone === '13800138000' ? '测试用户' : '用户' + loginPhone.slice(-4),
        token: 'mock-token-' + Date.now()
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userInfo', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      // 清除重定向路径，确保登录后进入主页面
      localStorage.removeItem('redirectPath');
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // 模拟注册API调用
  const register = async (phone, password) => {
    setAuthLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 简单的注册验证
      if (phone && password && password.length >= 6) {
        return { success: true };
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // 上下文值
  const value = {
    isAuthenticated,
    user,
    loading,
    authLoading,
    login,
    register,
    logout,
    setUser
  };

  // 加载状态 - 不显示加载页面，直接渲染子组件
  // 这样可以确保用户能立即看到WelcomePage
  if (loading) {
    return null; // 或者返回一个空的占位符
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 认证钩子
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
};

// 获取登录后应该重定向的路径
export const getRedirectPath = () => {
  // 登录后总是进入emotion-journal页面作为主页面
  return '/journal';
};

// 受保护的路由组件
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 保存当前位置，但登录后将直接进入主页面
    return <Navigate to="/login" replace />;
  }

  return children;
}
