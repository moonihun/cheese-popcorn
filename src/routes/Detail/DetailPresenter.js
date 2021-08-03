import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const IMDB = styled.button`
  background-color: #f7bf1a;
  color: black;
  border: none;
  border-radius: 5px;
`;

const ProductionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 0;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

const ProductionLogo = styled.img`
  width: 100px;
  height: 100%;
`;

const ProductionCountries = styled.div`
  display: flex;
  flex-direction: column;
`;

const Country = styled.p`
  margin-top: 5px;
  font-size: 14px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Cheese Popcorn</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{result.title || result.name} | Cheese Popcorn</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Data>
          <Title>{result.title || result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date?.substring(0, 4) ||
                result.first_air_date?.substring(0, 4)}
            </Item>
            <Divider>▪</Divider>
            <Item>{result.runtime || result.episode_run_time?.[0]}m</Item>
            <Divider>▪</Divider>
            <Item>
              {result.genres?.map((genre, index) =>
                index === result.genres.length - 1
                  ? genre.name
                  : `${genre.name} / `
              )}
            </Item>

            {result.imdb_id ? (
              <>
                <Divider>▪</Divider>
                <Item>
                  <IMDB>
                    <a
                      target='_blank'
                      href={`https://www.imdb.com/title/${result.imdb_id}`}
                    >
                      IMDB
                    </a>
                  </IMDB>
                </Item>
              </>
            ) : null}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <ProductionContainer>
            {result.production_companies?.map((company) =>
              company.logo_path ? (
                <ProductionLogo
                  src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                />
              ) : null
            )}
          </ProductionContainer>
          <ProductionCountries>
            <p style={{ fontSize: '16px', marginBottm: '10px' }}>- Countries</p>
            {result.production_countries?.map((country) => (
              <Country>{country.name}</Country>
            ))}
          </ProductionCountries>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
