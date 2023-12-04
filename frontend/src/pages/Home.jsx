import { Row, Col, Container } from 'react-bootstrap';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? (
        <main className="py-3">
          <Container>
            <ProductCarousel />
          </Container>
        </main>
      ) : (
        <Container className='pt-3'>
          <Link to="/" className="btn btn-light mb-4">
            Go Back
          </Link>
        </Container>
      )}
      {isLoading ? (
        <main className="py-3">
          <Container>
            <Loader />
          </Container>
        </main>
      ) : error ? (
        <Message>{error?.data?.error || error.error}</Message>
      ) : (
        <>
          <main className="py-3">
            <Container>
              <h1>Latest Products</h1>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductItem product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </Container>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
