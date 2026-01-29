import React, { useState, useEffect } from 'react';

// URL вашего API. Этот адрес указывает на деплой Meloan API в Cloudflare Workers
const API_BASE = 'https://meloan-api-prod.stgor31.workers.dev';

const Accept: React.FC = () => {
  const token = new URLSearchParams(window.location.search).get('token');
  const [loan, setLoan] = useState<any>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/loans/by-token?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.loan) setLoan(data.loan);
      })
      .catch(console.error);
  }, [token]);

  const acceptLoan = () => {
    fetch(`${API_BASE}/api/loans/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Займ принят!');
      } else {
        alert(data.error || 'Произошла ошибка.');
      }
    })
    .catch(console.error);
  };

  if (!token) return <p>Параметр token не указан.</p>;
  if (!loan) return <p>Загрузка данных займа…</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Принятие займа</h1>
      <p><strong>Сумма:</strong> {loan.amount}</p>
      <p><strong>Процент:</strong> {loan.interest_rate}%</p>
      <p><strong>Срок:</strong> {loan.term_months} мес.</p>
      <p>Введите email для подтверждения:</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@example.com"
        style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={acceptLoan} style={{ padding: '8px 16px' }}>
        Принять займ
      </button>
    </div>
  );
};

export default Accept;
