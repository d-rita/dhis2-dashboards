import { 
  IconWorld16,
  IconTextBox16,
  IconVisualizationLine16,
  IconVisualizationLineMulti16,
  IconVisualizationPie16,
  IconVisualizationPivotTable16,
  IconVisualizationGauge16,
  IconVisualizationColumn16,
  IconVisualizationArea16,
  IconVisualizationColumnStacked16
} from '@dhis2/ui';

export function getVisualizationIcon(VisualizationItem) {
  let barType = '';
  switch(VisualizationItem['visualization']['type']) {
    case 'COLUMN':
      barType = <IconVisualizationColumn16 />
      break;
    case 'LINE':
      barType = <IconVisualizationLine16 />
      break;
    case 'PIE':
      barType = <IconVisualizationPie16 />
      break;
    case 'PIVOT_TABLE':
      barType = <IconVisualizationPivotTable16 />
      break;
    case 'YEAR_OVER_YEAR_LINE':
      barType = <IconVisualizationLineMulti16 />
      break;
    case 'STACKED_COLUMN':
      barType = <IconVisualizationColumnStacked16 />
      break;
    case 'GAUGE':
      barType = <IconVisualizationGauge16 />
      break;
    default:
      barType = <IconVisualizationArea16 />;
  }
  return barType
}

export function getItemTypeIcon(itemData) {
  const { type } = itemData;
  switch(type){
    case 'MAP':
      return <IconWorld16 />
    case 'TEXT':
      return <IconTextBox16 />
    case 'VISUALIZATION':
      return getVisualizationIcon(itemData)
    default:
      return <IconVisualizationArea16 />;
  }
}