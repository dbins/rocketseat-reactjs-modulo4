import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as PlaylistActions } from "../ducks/playlists";
import { Creators as ErrorActions } from "../ducks/error";

//Funcao generator é semelhante ao ASYNC
export function* getPlaylists() {
  try {
    //Yield é semelhante ao await
    const response = yield call(api.get, "/playlists");
    yield put(PlaylistActions.getPlaylistSuccess(response.data));
  } catch (err) {
    yield put(ErrorActions.setError('Não foi possível obter informações'))
  }
}
