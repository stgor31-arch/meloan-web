import React, { useState, useEffect } from 'react';

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
      });
  }, [token]);

  const acceptLoan = () => {
    fetch(`${API_BASE}/api/loans/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.success ? 'Займ принят!' : (data.error || 'Ошибка'));
    });
  };

  if (!token) return <p>Параметр token не указан.</p>;
  if (!loan) return <p>Загрузка данных займа…</p>;

  return (
    <div>
      <h1>Принятие займа</h1>
      <p>Сумма: {loan.amount}</p>
      <p>Процент: {loan.interest_rate}%</p>
      <p>Срок: {loan.term_months} мес.</p>
      <label>
        Ваш email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button onClick={acceptLoan}>Принять займ</button>
    </div>
  );
};

export default Accept;

