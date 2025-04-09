import { PaymentResponse } from '@/features/subscriptions/model/subscriptionsApi.types';
import s from './PaymentsTable.module.scss';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';

type Props = {
  payments?: PaymentResponse[];
};

export const PaymentsTable = ({ payments }: Props) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>Date of Payment</th>
          <th>End date of subscription</th>
          <th>Price</th>
          <th>Subscription type</th>
          <th>Payment Type</th>
        </tr>
      </thead>
      <tbody>
        {payments?.map((payment) => (
          <tr key={payment.dateOfPayment}>
            <td>{convertToLocalDate(payment.dateOfPayment)}</td>
            <td>{convertToLocalDate(payment.endDateOfSubscription)}</td>
            <td>{payment.price}</td>
            <td>{payment.subscriptionType === 'DAY' ? 'DAILY' : payment.subscriptionType}</td>
            <td>{payment.paymentType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
