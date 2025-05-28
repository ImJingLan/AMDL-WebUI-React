import "../assets/css/InputBlock.styl"
import { useState, useRef, useEffect } from 'react';


function InputBlock() {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const LINE_HEIGHT = 1.2; // 基于 1rem 字体的行高倍数
  const MAX_LINES = 13;

  // 计算当前行数
  const calculateLines = () => {
    if (!textareaRef.current) return 0;
    const computedStyle = window.getComputedStyle(textareaRef.current);
    const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * LINE_HEIGHT;
    return Math.floor(textareaRef.current.scrollHeight / lineHeight);
  };

  // 动态调整高度
  const adjustHeight = () => {
    if (!textareaRef.current) return;
    const currentLines = calculateLines();

    if (currentLines <= MAX_LINES) {
      // 动态高度模式
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    } else {
      // 固定高度模式
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * LINE_HEIGHT;
      textareaRef.current.style.height = `${lineHeight * MAX_LINES}px`;
    }
  };

  // 初始化时设置默认高度
  useEffect(() => {
    if (textareaRef.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const initialHeight = parseFloat(computedStyle.fontSize) * LINE_HEIGHT;
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        adjustHeight();
      }}

      className="InputBlock"

    />
  );
}

export default InputBlock