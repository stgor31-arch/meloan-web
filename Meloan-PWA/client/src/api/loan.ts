export type LoanCalcRequest = {
  amount: number;
  rate: number;
  months: number;
};

export type LoanScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type LoanCalcResponse = {
  amount: number;
  months: number;
  annualRatePct: number;
  monthlyPayment: number;
  total: number;
  overpay: number;
  schedule: LoanScheduleRow[];
};

export async function calcLoan(req: LoanCalcRequest): Promise<LoanCalcResponse> {
  const res = await fetch("/api/loan/calc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return await res.json();
}

