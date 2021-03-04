export const TVandMovieDetailStackOpts = ({navigation,route}) => ({
  title: route.params.title || 'Search Result',
  headerTintColor: '#fff',
  headerPressColorAndroid: '#fff',
  headerStyle: {
    backgroundColor: '#1f1f1f'
  }
});