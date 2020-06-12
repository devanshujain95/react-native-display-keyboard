import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { numericKeyboard } from '../utils/constants';
import { verticalScale, moderateScale } from '../utils/util';
import { styles } from './styles';

interface optionCharType {
  key: string;
  value: string;
}

interface Props {
  charCellHeight: number;
  charFontSize: number;
  charCellBackgroundColor: string;
  charCellTextColor: string;
  borderColor: string;
  optnlChar: optionCharType;
  getInput: (input: string) => void;
  getPressedChar: (input: string) => void;
}

interface State {
  input: string;
}

export default class DisplayKeyboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { input: '' };
  }

  // get pressed char
  getPressedChar(char: string) {
    this.props.getPressedChar(char);
    let input: string;
    if (char === '-1') {
      // backspace
      input = this.state.input.slice(0, -1);
    } else {
      input = this.state.input + char;
    }
    this.setState({ input }, () => {
      this.props.getInput(input);
    });
  }

  // rendering keypad
  renderKeyboard = () => {
    const {
      charCellHeight,
      charCellBackgroundColor,
      charFontSize,
      charCellTextColor,
      borderColor
    } = this.props;
    const flattenCharCellStyle = StyleSheet.flatten([
      styles.cellStyle,
      {
        height: verticalScale(charCellHeight),
        backgroundColor: charCellBackgroundColor,
        borderColor: borderColor
      }
    ]);
    const flattenCharTextStyle = StyleSheet.flatten([
      { fontSize: moderateScale(charFontSize), color: charCellTextColor }
    ]);
    return (
      <View style={styles.view}>
        {numericKeyboard.map(({ key, value }, index: number) => {
          let charText: string, charValue: string;
          charText = charValue = value;
          if (key === 'optnlChar' && this.props.optnlChar) {
            charText = this.props.optnlChar.key;
            charValue = this.props.optnlChar.value;
          } else if (key === 'backspace') {
            charValue = '-1';
          }
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.getPressedChar(charValue)}
              style={flattenCharCellStyle}
            >
              <Text style={flattenCharTextStyle}>{charText}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    return <View>{this.renderKeyboard()}</View>;
  }
}
