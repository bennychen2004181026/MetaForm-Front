import React from 'react';

import DropDownIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import FileUploadIcon from '@mui/icons-material/BackupOutlined';
import DateIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ParagraphIcon from '@mui/icons-material/FeedOutlined';
import ShortAnswerIcon from '@mui/icons-material/NotesOutlined';
import ChoiceIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import TimeIcon from '@mui/icons-material/TimerOutlined';

import IOption from '@/interfaces/IOption';
import CheckboxesQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/CheckboxesQuestion';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';
import ShortAnswerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/ShortAnswerQuestion';

enum questionTypeStrings {
    MULTIPLE_CHOICE = 'Multiple Choice',
    SHORT_ANSWER = 'Short answer',
    PARAGRAPH = 'Paragraph',
    DROPDOWN = 'Dropdown',
    CHECKBOXES = 'CheckBoxes',
    FILE_UPLOAD = 'File upload',
    DATEPICKER = 'Date',
    TIMEPICKER = 'Time',
}
const questionTypes: IOption[] = [
    {
        id: '0',
        value: questionTypeStrings.MULTIPLE_CHOICE,
        icon: <ChoiceIcon />,
    },
    {
        id: '1',
        value: questionTypeStrings.SHORT_ANSWER,
        icon: <ShortAnswerIcon />,
    },
    {
        id: '2',
        value: questionTypeStrings.PARAGRAPH,
        icon: <ParagraphIcon />,
    },
    {
        id: '3',
        value: questionTypeStrings.DROPDOWN,
        icon: <DropDownIcon />,
    },
    {
        id: '4',
        value: questionTypeStrings.CHECKBOXES,
        icon: <CheckBoxIcon />,
    },
    {
        id: '5',
        value: questionTypeStrings.FILE_UPLOAD,
        icon: <FileUploadIcon />,
    },
    {
        id: '6',
        value: questionTypeStrings.DATEPICKER,
        icon: <DateIcon />,
    },
    {
        id: '7',
        value: questionTypeStrings.TIMEPICKER,
        icon: <TimeIcon />,
    },
];
const questionIcons = [
    ChoiceIcon,
    ShortAnswerIcon,
    ParagraphIcon,
    DropDownIcon,
    CheckBoxIcon,
    FileUploadIcon,
    DateIcon,
    TimeIcon,
];

const getQuestion = (questionId: string) => {
    switch (questionId) {
        case '0':
            return <MuitiChoiceQuestion isCheckbox={false} />;
        case '1':
            return <ShortAnswerQuestion />;
        case '4':
            return <CheckboxesQuestion />;
        default:
            return <MuitiChoiceQuestion isCheckbox={false} />;
    }
};
export { getQuestion, questionIcons as icons, questionTypes };
