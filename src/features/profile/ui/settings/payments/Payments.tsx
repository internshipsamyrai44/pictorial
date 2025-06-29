import { Pagination, Select, SelectContainer, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Payments.module.scss';
import { PaymentsTable } from './payments-table/PaymentsTable';
import { useState, useEffect } from 'react';
import { useGetMyPaymentsQuery } from '@/features/subscriptions/api/subscriptionsApi';

export const Payments = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: payments } = useGetMyPaymentsQuery(undefined, {
    skip: !isClient
  });

  const handlePageSizeChange = (value: string) => {
    setPageSize(+value);
    setPage(1);
  };

  const paginatedPayments = payments?.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <PaymentsTable payments={paginatedPayments} />
      <div className={s.pagination}>
        <Pagination currentPage={page} onChangePage={setPage} pageSize={pageSize} totalCount={payments?.length || 0} />
        <SelectContainer content={['Показать', 'на странице']}>
          <Select onValueChange={handlePageSizeChange} value={pageSize.toString()}>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </Select>
        </SelectContainer>
      </div>
    </div>
  );
};
