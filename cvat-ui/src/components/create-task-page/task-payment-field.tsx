// Copyright (C) 2024 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useRef } from 'react';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { Select } from 'antd';
import validationPatterns from 'utils/validation-patterns';

const currency = [
    { title: '$ USD', value: 'USD' },
    { title: '€ EUR', value: 'EUR' },
    { title: '₩ KRW', value: 'KRW' },
];

export interface TaskPaymentConfiguration {
    amount: number | null;
    currency: string
}

interface Props {
    taskPayment: TaskPaymentConfiguration;
    onChange(field: 'amount' | 'currency', values: string | number): void;
    defaultCurrency: string
}

function TaskPaymentField({ onChange, defaultCurrency, taskPayment }: Props): JSX.Element {
    const formRef = useRef(null);

    // const {amount, currency: currentCurrency} = taskPayment;
    console.log('task payment', taskPayment);

    const MAX_SLUG_LEN = 6;

    const selectBefore = (
        <Select defaultValue={defaultCurrency}>
            {currency.map((item) => (
                <Select.Option key={item.value} value={item.value}>{item.title}</Select.Option>
            ))}
        </Select>
    );

    const handleChangeTaskPayment = (field: 'amount' | 'currency', e: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(field, e.target.value);
    };

    return (
        <Form ref={formRef} layout='vertical'>
            <Form.Item
                hasFeedback
                name='task payment'
                label={<span>Task Payment</span>}
                rules={[
                    {
                        required: true,
                        message: 'Task payment cannot be empty',
                    },
                    { max: MAX_SLUG_LEN, message: `Short name must not exceed ${MAX_SLUG_LEN} characters` },
                    { ...validationPatterns.validateTaskPayment },
                ]}
            >
                <Input addonBefore={selectBefore} onChange={(e) => handleChangeTaskPayment('amount', e)} />
            </Form.Item>
        </Form>
    );
}

export default TaskPaymentField;
