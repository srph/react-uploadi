import React from 'react';
import {storiesOf} from '@storybook/react';
import c from 'classnames'
import {ajax} from './utils'
import axios from 'axios'
import Single from './stories/01-single'
import Multiple from './stories/02-multiple'
import DragSingle from './stories/03-drag-single'
import DragMultiple from './stories/04-drag-multiple'
import LoadingSingle from './stories/05-loading-single'
import LoadingMultiple from './stories/06-loading-multiple'
import UploadSingle from './stories/07-upload-single'
import UploadMultiple from './stories/08-upload-multiple'

storiesOf('Uploadi', module)
  .add('single', () => <Single />)
  .add('multiple', () => <Multiple />)
  .add('react to drag over', () => <DragSingle />)
  .add('react to drag over (multiple)', () => <DragMultiple />)
  .add('loading state', () => <LoadingSingle />)
  .add('loading state (multiple)', () => <LoadingMultiple />)
  .add('actual file upload', () => <UploadSingle />)
  .add('actual file upload (multiple)', () => <UploadMultiple />)
