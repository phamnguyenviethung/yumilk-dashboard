const formatMoney = (x = 0) => {
  return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
};

export default formatMoney;
