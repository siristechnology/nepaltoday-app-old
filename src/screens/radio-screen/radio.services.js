import gql from 'graphql-tag'
import client from './../../graphql/graphql-client'
import crashlytics from '@react-native-firebase/crashlytics'

class RadioService{
    saveFavorite = async (nid, fmId) => {
        client
            .mutate({
                mutation: SAVE_FAVORITE,
                variables: {
                    input: {
                        nid,
                        fmId
                    }
                }
            })
            .catch((reason) => crashlytics().recordError(reason))
    }

    deleteFavorite = async (nid, fmId) => {
        client
            .mutate({
                mutation: DELETE_FAVORITE,
                variables: {
                    input: {
                        nid,
                        fmId
                    }
                }
            })
            .catch((reason) => crashlytics().recordError(reason))
    }

}

const SAVE_FAVORITE = gql`
    mutation saveFavoriteMutation($input: SaveFavorite!){
        saveFavorite(input: $input){
            success
        }
    }
`

const DELETE_FAVORITE = gql`
    mutation deleteFavoriteMutation($input: SaveFavorite!){
        deleteFavorite(input: $input){
            success
        }
    }
`

export default new RadioService()