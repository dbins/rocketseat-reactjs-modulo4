import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlaylistDetailsActions } from "../../store/ducks/playlistDetails";
import { Creators as PlayerActions } from "../../store/ducks/player";
import Loading from "../../components/Loading";
import { Container, Header, SongList, SongItem } from "./styles";
import ClockIcon from "../../assets/images/clock.svg";
import PlusIcon from "../../assets/images/plus.svg";

class Playlist extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number
      })
    }).isRequired,
    getPlaylistDetailsRequest: PropTypes.func.isRequired,
    playlistDetails: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          thumbnail: PropTypes.string,
          description: PropTypes.string,
          songs: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              title: PropTypes.string,
              author: PropTypes.string,
              album: PropTypes.string
            })
          )
        })
      ),
      loading: PropTypes.bool
    }).isRequired,
    loadSong: PropTypes.func.isRequired,
    currentSong: PropTypes.shape({
      id: PropTypes.number
    }).isRequired
  };

  state = {
    selected: null
  };
  componentDidMount() {
    this.loadPlaylistDetails();
  }

  //Se a página ja estava aberta e clicou na sidebar, verificar se a URL mudou.
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id === this.props.match.params.id) {
      //Nao faz nada
    } else {
      this.loadPlaylistDetails();
    }
  }

  loadPlaylistDetails = () => {
    const { id } = this.props.match.params; //Match sao os parametros enviados pelo React Router
    this.props.getPlaylistDetailsRequest(id);
  };

  renderDetails = () => {
    const playlist = this.props.playlistDetails.data;
    return (
      <Container>
        <Header>
          <img src={playlist.thumbnail} alt={playlist.title} />
          <div>
            <span>Playlist</span>
            <h1>{playlist.title}</h1>
            {!!playlist.songs && <p>{playlist.songs.length} músicas</p>}
            <button>Play</button>
          </div>
        </Header>
        <SongList cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th />
              <th>Título</th>
              <th>Artista</th>
              <th>Album</th>
              <th>
                <img src={ClockIcon} alt="Duração" />
              </th>
            </tr>
          </thead>
          <tbody>
            {!playlist.songs ? (
              <tr>
                <td colSpan={5}>Nenhuma música cadastrada</td>
              </tr>
            ) : (
              playlist.songs.map(song => (
                <SongItem
                  key={song.id}
                  onClick={() => this.setState({ selected: song.id })}
                  onDoubleClick={() =>
                    this.props.loadSong(song, playlist.songs)
                  }
                  selected={this.state.selectedSong === song.id}
                  playing={
                    this.props.currentSong && this.props.currentSong === song.id
                  }
                >
                  <td>
                    <img src={PlusIcon} alt="Adicionar" />
                  </td>

                  <td>{song.title}</td>
                  <td>{song.author}</td>
                  <td>{song.album}</td>
                  <td>00:00</td>
                </SongItem>
              ))
            )}
          </tbody>
        </SongList>
      </Container>
    );
  };
  render() {
    return this.props.playlistDetails.loading ? (
      <Container loading>
        <Loading />
      </Container>
    ) : (
      this.renderDetails()
    );
  }
}

const mapStateToProps = state => ({
  playlistDetails: state.playlistDetails,
  currentSong: state.player.currentSong
});

const mapDispatchToProps = dispatch =>
  //bindActionCreators(PlaylistDetailsActions, dispatch);
  bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
