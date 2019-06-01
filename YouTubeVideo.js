import React from "react";
import { StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import YouTube from "react-native-youtube";

export default class YouTubeVideo extends React.Component {
  static navigationOptions = {
    headerTitle: "StreamStudy",
    headerStyle: {
      backgroundColor: "#000"
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null
  };

  render() {
    return (
      <View>
        <YouTube
          ref={component => {
            this._youTubeRef = component;
          }}
          videoId={this.props.navigation.state.params.youtubeId}
          play={true}
          fullscreen={false}
          loop={false}
          apiKey={"AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw"}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: "stretch", height: 300 }}
          play={this.state.isPlaying}
          loop={this.state.isLooping}
          fullscreen={this.state.fullscreen}
          controls={1}
          onError={e => this.setState({ error: e.error })}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onChangeFullscreen={e =>
            this.setState({ fullscreen: e.isFullscreen })
          }
          onProgress={e =>
            this.setState({
              duration: e.duration,
              currentTime: e.currentTime
            })
          }
        />
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}
          >
            <Text style={styles.buttonText}>
              {this.state.status == "playing" ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
          </View>
 {!this.state.fullscreen && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ fullscreen: true })}
            >
              <Text style={styles.buttonText}>Set Fullscreen</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.instructions}>
          {this.state.isReady ? "Player is ready" : "Player setting up..."}
        </Text>
        
        <Text style={styles.instructions}>Status: {this.state.status}</Text>
        <Text style={styles.title}>
          {this.props.navigation.state.params.title}
        </Text>
        <Text style={styles.views}>
          {this.props.navigation.state.params.number} Views
        </Text>
       
        <Text style={styles.views}>
          {this.props.navigation.state.params.description}
        </Text>

    
        

        {/* discription */}
        {/* snippet.publishedAt */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    color: "#000",
    fontSize: 18,
    padding: 5,
    fontWeight: "400"
  },
  views: {
    textAlign: "left",
    padding: 5,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "300"
  },
  buttonGroup: {
    flexDirection: "row",
    alignSelf: "center"
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "blue"
  },
  buttonTextSmall: {
    fontSize: 15
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  player: {
    alignSelf: "stretch",
    marginVertical: 10
  }
});
