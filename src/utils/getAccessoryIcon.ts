import SpeedSvg from '../assets/speed.svg';
import ForceSvg from '../assets/force.svg';
import HybridSvg from '../assets/hybrid.svg';
import EnergySvg from '../assets/energy.svg';
import PeopleSvg from '../assets/people.svg';
import ExchangeSvg from '../assets/exchange.svg';
import GasolineSvg from '../assets/gasoline.svg';
import AcclerationSvg from '../assets/acceleration.svg';
import CarSvg from '../assets/car.svg';

export function getAccessoryIcon(type: string) {
    switch (type) {
        case 'speed':
            return SpeedSvg;
        
        case 'acceleration':
            return AcclerationSvg;
        
        case 'turning_diameter':
            return ForceSvg;
        
        case 'gasoline_motor':
            return GasolineSvg;
        
        case 'electric_motor':
            return EnergySvg;
        
        case 'hybrid_motor':
            return HybridSvg;
        
        case 'exchange':
            return ExchangeSvg;
        
        case 'seats':
            return PeopleSvg;
        default:
            return CarSvg;
    }
}