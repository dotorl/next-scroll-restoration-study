import { useEffect } from 'react';

const Detail = () => {
  // useEffect(() => {
  //   console.log('DETAIL useEffect');
  //   window.scrollTo(0, 150);
  // }, []);

  useEffect(() => {
    const scroll = (event) => {
      const { pageYOffset, scrollY } = window;
      console.log('yOffset', pageYOffset, 'scrollY', scrollY);
    };
    document.addEventListener('scroll', scroll);
    // remove event on unmount to prevent a memory leak
    return () => {
      document.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <>
      <div>detail PAGE</div>
      <div style={{ height: '200px', background: 'red' }}>aaaaaaa</div>
      <div style={{ height: '200px' }}>bbbbbb</div>
      <div style={{ height: '200px', background: 'yellow' }}>cccccc</div>
      <div style={{ height: '200px' }}>dddddd</div>
    </>
  );
};

export default Detail;
