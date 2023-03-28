import styled from 'styled-components';

import { v } from '../../model/styles/variables';

export const SAddButton = styled.button`
	margin-bottom: 10px;
	border-radius: 50px;
	border: none;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	cursor: pointer;
	font-size: 16px;
	font-weight: 700;
	padding: 15px 60px;
	background-color: ${({ theme }) => theme.bg};
	color: ${({ theme }) => theme.text};

	&:hover {
		opacity: 0.9;
		transform: scale(0.98);
	}
`;

export const STable = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: center;
	border-radius: ${v.borderRadius};
	overflow: hidden;
`;

export const STHead = styled.thead`
	position: sticky;
	z-index: 100;
`;

export const STHeadTR = styled.tr`
	background: ${({ theme }) => theme.bg};
`;

export const STH = styled.th`
	font-weight: normal;
	padding: ${v.smSpacing};
	color: ${({ theme }) => theme.text};
	text-transform: capitalize;
	font-weight: 600;
	font-size: 14px;
	:not(:last-of-type) {
		border-right: 1px solid ${({ theme }) => theme.bg2};
	}
	:first-of-type {
		width: 1%;
		white-space: nowrap;
	}
`;

export const STBody = styled.tbody``;

export const STBodyTR = styled.tr`
	background: ${({ theme }) => theme.white};
`;

export const STD = styled.td`
	padding: ${v.smSpacing};
	border: 1px solid ${({ theme }) => theme.bg2};
	font-size: 14px;
`;

export const STBodyButton = styled.button`
	text-align: center;
	font-size: 14px;
	border-radius: 50px;
	:first-of-type {
		margin-right: 5px;
	}
`;

export const STBodyInput = styled.input`
	padding: ${v.smSpacing};
	border: 1px solid ${({ theme }) => theme.bg2};
	font-size: 14px;
`;
