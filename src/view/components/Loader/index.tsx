import { FC, memo } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loader: FC = () => (
	<SkeletonTheme
		baseColor="#ddd"
		highlightColor="#fff"
		borderRadius="0.3rem"
		duration={4}
	>
		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Age</th>
					<th>About</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{Array.from(new Array(10)).map((_, idx) => (
					<tr key={`load-row-${idx}`}>
						<td>
							<Skeleton />
						</td>
						<td>
							<Skeleton />
						</td>
						<td>
							<Skeleton />
						</td>
						<td>
							<Skeleton />
						</td>
						<td>
							<Skeleton />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</SkeletonTheme>
);

export default memo(Loader);
