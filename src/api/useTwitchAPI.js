import TwitchClient from 'twitch'

export function useTwitchApi() {
  const [client, setClient] = useState(null)
  const [user, setUser] = useState(null)

  const TClient = TwitchClient.withCredentials(Client_ID, 'TWITCH_TOKEN_HERE')

  const initUser = () => {
    client.users.getMe().then((u) => {
      console.log(u)
      setUser(u)
      client.users.getFollowsPaginated({ u }).getNext().then((follow) => {
        user.following = follow.map((each) => each.followedUserId)
        setUser(user)
      })
    })
  }
  async function initApi() {
    setClient(api)
    initUser()
  }

  useEffect(() => {
    initApi()

    return () => { }
  }, []);

  return [client, user]
}