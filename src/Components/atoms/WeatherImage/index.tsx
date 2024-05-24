import { ImageNameBasedOnCode } from '@/src/Libs/Contants/Constant';
import Image from 'next/image';

interface IWeatherImageComponent {
    weatherCode?: keyof typeof ImageNameBasedOnCode;
}

function WeatherImage(props: IWeatherImageComponent) {
    const { weatherCode = 0 } = props;

    return (
        <Image
            fill
            src={`/assets/images/${
                ImageNameBasedOnCode[weatherCode] ?? 'default'
            }.png`}
            alt={ImageNameBasedOnCode[weatherCode] ?? 'weather Image'}
            title={ImageNameBasedOnCode[weatherCode]}
        />
    );
}

export default WeatherImage;
